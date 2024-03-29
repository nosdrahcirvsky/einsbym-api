import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { CreateFileInput } from '../models/dtos/create-file.input';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {}

    async create(createFileInput: CreateFileInput) {
        const file = this.fileRepository.create(createFileInput);
        return await this.fileRepository.save(file);
    }

    async findAll(fileTypes: string[], skip: number, take: number) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('f')
            .select(['f.id', 'f.filename', 'f.fileType', 'p.id', 'p.createdAt'])
            .leftJoin('f.post', 'p')
            .where('f.fileType IN (:...fileTypes)', { fileTypes: fileTypes })
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async findByUser(userId: string) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('f')
            .select(['f.id', 'f.filename', 'f.fileType'])
            .innerJoin('post', 'p', 'f.post_id = p.id')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .limit(9);

        return await queryBuilder.getMany();
    }

    async findRandom() {
        const file = await this.fileRepository
            .createQueryBuilder('f')
            .select(['f.id', 'f.filename', 'f.fileType', 'p.id', 'u.id', 'u.username', 'u.profilePicture'])
            .leftJoin('f.post', 'p')
            .leftJoin('p.user', 'u')
            .where('f.fileType != :fileType', { fileType: 'video/mp4' })
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();

        return file;
    }

    async remove(id: string) {
        const image = await this.fileRepository.findOne({ where: { id: id } });

        if (!image) {
            throw new NotFoundException('File not found');
        }

        return await this.fileRepository.remove(image);
    }
}
