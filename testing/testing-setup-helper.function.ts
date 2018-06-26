import {
  async,
  ComponentFixture,
  TestBed,
  TestModuleMetadata
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ITestContext, ITestContextWithHost } from './test-context.interface';

export function mergeTestingModules(
  ...testModuleMetadata: TestModuleMetadata[]
): TestModuleMetadata {
  return {
    declarations: getUniqueValues(
      testModuleMetadata.map((t: TestModuleMetadata) =>
        getArrayOrEmpty(t.declarations)
      )
    ),
    imports: getUniqueValues(
      testModuleMetadata.map((t: TestModuleMetadata) =>
        getArrayOrEmpty(t.imports)
      )
    ),
    providers: getUniqueValues(
      testModuleMetadata.map((t: TestModuleMetadata) =>
        getArrayOrEmpty(t.providers)
      )
    ),
    schemas: getUniqueValues(
      testModuleMetadata.map((t: TestModuleMetadata) =>
        getArrayOrEmpty(t.schemas)
      )
    )
  };
}

export function configureTestingModule<TT, TH>(
  testNoduleMetadata: TestModuleMetadata
): void {
  beforeEach(async(() => {
    TestBed.configureTestingModule(testNoduleMetadata).compileComponents();
  }));
}

export function getTestContextWithHost<TH, TT>(
  testedType: Type<TT>,
  hostType: Type<TH>
): ITestContextWithHost<TH, TT> {
  const fixture: ComponentFixture<TH> = TestBed.createComponent<TH>(hostType);
  fixture.detectChanges();
  const testedDebugElement: DebugElement = fixture.debugElement.query(
    By.directive(testedType)
  );

  return {
    fixture: fixture,

    hostComponent: fixture.componentInstance,
    hostElement: fixture.nativeElement,

    testedComponent: testedDebugElement.componentInstance,
    testedElement: testedDebugElement.nativeElement
  };
}

export function getTestContext<TT>(testedType: Type<TT>): ITestContext<TT> {
  const fixture: ComponentFixture<TT> = TestBed.createComponent<TT>(testedType);
  fixture.detectChanges();
  const testedDebugElement: DebugElement = fixture.debugElement;

  return {
    fixture: fixture,
    testedComponent: testedDebugElement.componentInstance,
    testedElement: testedDebugElement.nativeElement
  };
}

function getUniqueValues(array: any[]): any[] {
  return Array.from(new Set([].concat.apply([], array)));
}

function getArrayOrEmpty(array?: any[]): any[] {
  return array ? array : [];
}
