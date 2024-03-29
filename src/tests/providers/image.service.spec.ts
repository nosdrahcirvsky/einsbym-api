import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../../providers/file.service';

describe('ImageService', () => {
    let service: FileService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileService],
        }).compile();

        service = module.get<FileService>(FileService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
