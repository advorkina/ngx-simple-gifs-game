import { mergeTestingModules } from "./testing-setup-helper.function";
import { TestModuleMetadata } from "@angular/core/testing";

describe("testing setup helper", () => {
  describe("mergeTestingModules", () => {
    describe("imports", () => {
      it("should return all imports of single TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          imports: ["module1", "module2"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(testModuleMetadataGiven1);

        // assert
        expect(testModuleMetadata.imports).toEqual(["module1", "module2"]);
      });

      it("should return all imports of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          imports: ["module1", "module2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          imports: ["module3", "module4"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.imports).toEqual(["module1", "module2", "module3", "module4"]);
      });

      it("should return unique imports of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          imports: ["module1", "module2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          imports: ["module3", "module1"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.imports).toEqual(["module1", "module2", "module3"]);
      });
    });

    describe("declarations", () => {
      it("should return all declarations of single TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          declarations: ["declaration1", "declaration2"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(testModuleMetadataGiven1);

        // assert
        expect(testModuleMetadata.declarations).toEqual(["declaration1", "declaration2"]);
      });

      it("should return all declarations of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          declarations: ["declaration1", "declaration2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          declarations: ["declaration3", "declaration4"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.declarations).toEqual([
          "declaration1",
          "declaration2",
          "declaration3",
          "declaration4"
        ]);
      });

      it("should return unique declarations of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          declarations: ["declaration1", "declaration2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          declarations: ["declaration3", "declaration1"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.declarations).toEqual(["declaration1", "declaration2", "declaration3"]);
      });
    });

    describe("providers", () => {
      it("should return all providers of single TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          providers: ["providers1", "providers2"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(testModuleMetadataGiven1);

        // assert
        expect(testModuleMetadata.providers).toEqual(["providers1", "providers2"]);
      });

      it("should return all providers of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          providers: ["providers1", "providers2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          providers: ["providers3", "providers4"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.providers).toEqual(["providers1", "providers2", "providers3", "providers4"]);
      });

      it("should return unique providers of multiple TestModuleMetadata", () => {
        // arrange
        let testModuleMetadataGiven1: TestModuleMetadata = {
          providers: ["providers1", "providers2"]
        };
        let testModuleMetadataGiven2: TestModuleMetadata = {
          providers: ["providers3", "providers1"]
        };

        //act
        let testModuleMetadata: TestModuleMetadata = mergeTestingModules(
          testModuleMetadataGiven1,
          testModuleMetadataGiven2
        );

        // assert
        expect(testModuleMetadata.providers).toEqual(["providers1", "providers2", "providers3"]);
      });
    });
  });
});
