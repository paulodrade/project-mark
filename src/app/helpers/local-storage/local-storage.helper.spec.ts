import { TestBed } from '@angular/core/testing';
import { LocalStorageHelper } from './local-storage.helper';

describe('LocalStorageHelper', () => {
  let service: LocalStorageHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageHelper],
    });
    service = TestBed.inject(LocalStorageHelper);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set', () => {
    it('should add an item to localStorage with an expiration time', () => {
      const key = 'testKey';
      const value = 'testValue';
      const minutes = 10;

      service.set(key, value, minutes);

      const storedItem = JSON.parse(localStorage.getItem(`PM-${key}`) || '{}');
      expect(storedItem.value).toBe(value);
      expect(storedItem.expires).toBeGreaterThan(new Date().getTime());
    });
  });

  describe('get', () => {
    it('should retrieve an item from localStorage if it has not expired', () => {
      const key = 'testKey';
      const value = 'testValue';
      const minutes = 10;

      service.set(key, value, minutes);

      const retrievedValue = service.get(key);
      expect(retrievedValue).toBe(value);
    });

    it('should return undefined if the item has expired', () => {
      const key = 'testKey';
      const value = 'testValue';

      const expiredItem = {
        value,
        expires: new Date().getTime() - 1000, // Expired 1 second ago
      };
      localStorage.setItem(`PM-${key}`, JSON.stringify(expiredItem));

      const retrievedValue = service.get(key);
      expect(retrievedValue).toBeUndefined();
    });

    it('should return undefined if the item does not exist', () => {
      const retrievedValue = service.get('nonExistentKey');
      expect(retrievedValue).toBeUndefined();
    });
  });

  describe('clearExpires', () => {
    it('should remove expired items from localStorage', () => {
      const expiredKey = 'expiredKey';
      const validKey = 'validKey';

      const expiredItem = {
        value: 'expiredValue',
        expires: new Date().getTime() - 1000, // Expired 1 second ago
      };
      const validItem = {
        value: 'validValue',
        expires: new Date().getTime() + 10000, // Expires in 10 seconds
      };

      localStorage.setItem(`PM-${expiredKey}`, JSON.stringify(expiredItem));
      localStorage.setItem(`PM-${validKey}`, JSON.stringify(validItem));

      service.clearExpires();

      expect(localStorage.getItem(`PM-${expiredKey}`)).toBeNull();
      expect(localStorage.getItem(`PM-${validKey}`)).not.toBeNull();
    });
  });
});