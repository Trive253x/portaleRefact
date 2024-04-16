import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpRichiesteInfoComponent } from './pop-up-richieste-info.component';

describe('PopUpRichiesteInfoComponent', () => {
  let component: PopUpRichiesteInfoComponent;
  let fixture: ComponentFixture<PopUpRichiesteInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpRichiesteInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpRichiesteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
