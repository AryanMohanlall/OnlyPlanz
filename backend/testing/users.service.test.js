import UserService from '../src/services/user.service.js';
import { jest } from '@jest/globals';


describe('UserService', () => {

  let mockUserModel;
  let mockBcrypt;
  let mockJwt;
  let userService;

  beforeEach(() => {
    mockUserModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      find: jest.fn(),
    };

    mockBcrypt = {
      compare: jest.fn(),
    };

    mockJwt = {
      sign: jest.fn(),
    };

    userService = new UserService({
      UserModel: mockUserModel,
      bcryptLib: mockBcrypt,
      jwtLib: mockJwt,
      jwtSecret: 'test-secret'
    });
  });

  it('should login successfully', async () => {
    const mockUser = {
      _id: '123',
      email: 'test@test.com',
      password: 'hashedPassword'
    };

    mockUserModel.findOne.mockResolvedValue(mockUser);
    mockBcrypt.compare.mockResolvedValue(true);
    mockJwt.sign.mockReturnValue('mockToken');

    const result = await userService.loginUser(
      'test@test.com',
      'password'
    );

    expect(result).toEqual({
      user: mockUser,
      token: 'mockToken'
    });

    expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(mockBcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    expect(mockJwt.sign).toHaveBeenCalled();
  });

});
