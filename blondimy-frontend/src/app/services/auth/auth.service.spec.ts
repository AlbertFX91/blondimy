import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';

import { AuthService } from './auth.service';
import { ApiService } from '../api/api.service';

describe('AuthService', () => {
  let service: AuthService;

  const username: string = "testuser";
  const password: string = "testpass";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register an user', () => {
    service.register(username, password).subscribe((res: any) => {
      expect(res.username).toBe(username);
      expect(res.password).toBeDefined();
      expect(res.token).toBeDefined();
    });
  });

  it('should login an user', () => {
    service.login(username, password).subscribe((res: any) => {
      expect(res.username).toBe(username);
      expect(res.password).toBeDefined();
      expect(res.token).toBeDefined();
    });
  });

  it('should show an error if the user does not exists', () => {
    const invalidUsername: string = "nonregistereduser";
    const invalidPassword: string = "password";
    service.login(invalidUsername, invalidPassword).subscribe((res: any) => {
      expect(res.status).toEqual(422);
      expect(res.error.message).toEqual('Duplicated value');
    });
  });
});
