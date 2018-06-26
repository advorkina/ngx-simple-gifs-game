import { ComponentFixture } from '@angular/core/testing';
import { Type } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';

export interface ITestContextWithHost<TH, TT> {
  fixture: ComponentFixture<TH>;

  hostComponent: TH;
  hostElement: any;

  testedComponent: TT;
  testedElement: any;
}

export interface ITestContext<TT> {
  fixture: ComponentFixture<TT>;
  testedComponent: TT;
  testedElement: any;
}
