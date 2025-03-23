import { TestBed } from '@angular/core/testing';

import { ResourcesHelper } from 'src/app/helpers/resources/resources.helper';

describe('ResourcesHelper', () => {
  let service: ResourcesHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
