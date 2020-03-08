import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';

import { AuthService } from './auth.service';
import { ApiService } from '../api/api.service';

describe('AuthService', () => {
  let service: AuthService;

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

  it('should login an user', () => {
    const username: string = "testuser";
    const password: string = "testpass";
    service.login(username, password).subscribe((res: any) => {
      expect(res.username).toBe(username);
      expect(res.password).toBeDefined();
      expect(res.token).toBeDefined();
    });
  });

  it('should show an error if the user does not exists', () => {
    const username: string = "nonregistereduser";
    const password: string = "password";
    service.login(username, password).subscribe((res: any) => {
      expect(res.status).toEqual(422);
      expect(res.error.message).toEqual('Duplicated value');
    });
  });
});
