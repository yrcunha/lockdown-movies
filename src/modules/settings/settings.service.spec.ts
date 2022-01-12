import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { SettingsRepository } from './settings.repository';
import { SettingsService } from './settings.service';

describe('AuthService', () => {
  let settingsService: SettingsService;
  let settingsRepository: SettingsRepository;
  let mockSettings: UpdateSettingsDto;

  const mockSettingsRepository = {
    createSetting: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: getRepositoryToken(SettingsRepository),
          useValue: mockSettingsRepository,
        },
      ],
    }).compile();

    settingsRepository = moduleRef.get<SettingsRepository>(SettingsRepository);
    settingsService = moduleRef.get<SettingsService>(SettingsService);
    mockSettings = {
      turnaroundTime: 1,
      fine: 10,
    };
  });

  it('should be defined the settingsservice', () => {
    expect(settingsService).toBeDefined();
    expect(settingsRepository).toBeDefined();
  });
});
