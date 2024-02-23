import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageInput } from '../models/dtos/create-image.input';
import { UpdateImageInput } from '../models/dtos/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) {}

    async create(createImageInput: CreateImageInput) {
        const image = this.imageRepository.create(createImageInput);
        return await this.imageRepository.save(image);
    }

    async findAll() {
        const queryBuilder = this.imageRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename'])
            .innerJoin('post', 'p', 'i.post_id = p.id')
            .orderBy('p.created_at', 'DESC')
            .limit(8);

        return await queryBuilder.getMany();
    }

    async findByUser(userId: string) {
        const queryBuilder = this.imageRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename'])
            .innerJoin('post', 'p', 'i.post_id = p.id')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .limit(9);

        return await queryBuilder.getMany();
    }

    async findOne(id: string) {
        const image = await this.imageRepository.findOne({ where: { id: id } });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return image;
    }

    update(id: number, updateImageInput: UpdateImageInput) {
        return `This action updates a #${id} image`;
    }

    async remove(id: string) {
        const image = await this.imageRepository.findOne({ where: { id: id } });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return await this.imageRepository.remove(image);
    }
}
