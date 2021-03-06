'use strict';

const Chai = require('chai');
const semver = require('semver');
const Sinon = require('sinon');

const helpers = require('../../helpers');
const utils = require('../../../lib/utils');

const assert = Chai.assert;

suite('utils Suite:', () => {
    let opts;
    let semverIncStub;

    setup(() => {
        opts = {};
        semver.inc('');
        semverIncStub = Sinon.stub(semver, 'inc').callsFake(() => helpers.bumpedVersion);
    });

    teardown(() => {
        Sinon.restore();
        opts = null;
    });

    suite('validateReleaseType Suite:', () => {
        test('Should set release type to default if no type is specified', () => {
            utils.validateReleaseType(opts);
            assert.deepEqual(opts.type, helpers.defaultReleaseType);
        });

        test('Should set release type to default if invalid type is specified', () => {
            opts.type = 'bad';
            semverIncStub.callsFake(() => false);
            utils.validateReleaseType(opts);
            assert.deepEqual(opts.type, helpers.defaultReleaseType);
        });

        test('Should use specified release type when patch type is specified', () => {
            opts.type = helpers.patchReleaseType;
            utils.validateReleaseType(opts);
            assert.deepEqual(opts.type, helpers.patchReleaseType);
        });

        test('Should use specified release type when minor type is specified', () => {
            opts.type = helpers.minorReleaseType;
            utils.validateReleaseType(opts);
            assert.deepEqual(opts.type, helpers.minorReleaseType);
        });

        test('Should use specified release type when major type is specified', () => {
            opts.type = helpers.majorReleaseType;
            utils.validateReleaseType(opts);
            assert.deepEqual(opts.type, helpers.majorReleaseType);
        });
    });

    suite('validateJsonIndent Suite:', () => {
        test('Should set json indent to default if no indent is specified', () => {
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default if invalid indent is specified', () => {
            opts.indent = 'bad';
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default if NaN indent is specified', () => {
            opts.indent = NaN;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default if invalid string indent is specified', () => {
            opts.indent = '10 20';
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default when negative indent is specified', () => {
            opts.indent = -3;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default when zero indent is specified', () => {
            opts.indent = 0;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should set json indent to default when indent greater than 10 is specified', () => {
            opts.indent = 17;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should use specified json indent when indent of 1 is specified', () => {
            const indent = 1;
            opts.indent = indent;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, indent);
        });

        test('Should use specified json indent when indent of 10 is specified', () => {
            const indent = 10;
            opts.indent = indent;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, indent);
        });

        test('Should use specified json indent when indent between 1 and 10 is specified', () => {
            const indent = 4;
            opts.indent = indent;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, indent);
        });

        test('Should set json indent when valid string indent is specified', () => {
            opts.indent = '3';
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.defaultJsonIndent);
        });

        test('Should use specified json indent when t character is specified', () => {
            opts.indent = 't';
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.tabCharacter);
        });

        test('Should use specified json indent when tab literal string is specified', () => {
            opts.indent = 'tab';
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.tabCharacter);
        });

        test('Should use specified json indent when tab character is specified', () => {
            opts.indent = helpers.tabCharacter;
            utils.validateJsonIndent(opts);
            assert.deepEqual(opts.indent, helpers.tabCharacter);
        });
    });

    suite('validateVersionPropertyType Suite:', () => {
        test('Should set version property type to default if no type is specified', () => {
            utils.validateVersionPropertyType(opts);
            assert.deepEqual(opts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should set version property type to default if invalid type is specified', () => {
            opts.versionPropertyType = 'bad';
            utils.validateVersionPropertyType(opts);
            assert.deepEqual(opts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should set version property type to default if upper case string type is specified', () => {
            opts.versionPropertyType = 'STRING';
            utils.validateVersionPropertyType(opts);
            assert.deepEqual(opts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should set version property type to default if mixed case string type is specified', () => {
            opts.versionPropertyType = 'StrInG';
            utils.validateVersionPropertyType(opts);
            assert.deepEqual(opts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should use string version property type when string type is specified', () => {
            opts.versionPropertyType = 'string';
            utils.validateVersionPropertyType(opts);
            assert.deepEqual(opts.versionPropertyType, helpers.stringVersionPropertyType);
        });
    });

    suite('validateOptions Suite:', () => {
        let validatedOpts;

        teardown(() => {
            validatedOpts = null;
        });

        test('Should initialize an opts object when no parameter is specified', () => {
            validatedOpts = utils.validateOptions();
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should initialize an opts object when null is specified', () => {
            validatedOpts = utils.validateOptions(null);
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should initialize an opts object when undefined is specified', () => {
            validatedOpts = utils.validateOptions(undefined);
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should initialize an opts object when an empty object is specified', () => {
            validatedOpts = utils.validateOptions({});
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should return opts object with default values', () => {
            validatedOpts = utils.validateOptions(opts);
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should return opts object with default values and specified release type', () => {
            const releaseType = 'major';
            opts.type = releaseType;
            validatedOpts = utils.validateOptions(opts);
            assert.deepEqual(validatedOpts.type, releaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should return opts object with default values and specified indent', () => {
            const indent = 4;
            opts.indent = indent;
            validatedOpts = utils.validateOptions(opts);
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, indent);
            assert.deepEqual(validatedOpts.versionPropertyType, helpers.defaultVersionPropertyType);
        });

        test('Should return opts object with default values and specified version property type', () => {
            const versionPropertyType = 'string';
            opts.versionPropertyType = versionPropertyType;
            validatedOpts = utils.validateOptions(opts);
            assert.deepEqual(validatedOpts.type, helpers.defaultReleaseType);
            assert.deepEqual(validatedOpts.indent, helpers.defaultJsonIndent);
            assert.deepEqual(validatedOpts.versionPropertyType, versionPropertyType);
        });
    });

    suite('getTaskVersion Suite:', () => {
        const invalidTaskErrorMessage = 'Encountered one or more invalid tasks. Task must represent version as an object under the \'version\' key ' +
            'with Major, Minor, and Patch fields (that start with Uppercase letters)';

        test('Should return correct task version string', () => {
            const taskJson = helpers.createSampleTaskContents(helpers.majorVersionStr, helpers.minorVersionStr, helpers.patchVersionStr);
            const version = utils.getTaskVersion(taskJson);
            assert.deepEqual(version, helpers.initialVersion);
        });

        test('Should throw an error when task is null', () => {
            assert.throws(() => utils.getTaskVersion(null));
        });

        test('Should throw an error when task is undefined', () => {
            assert.throws(() => utils.getTaskVersion(null));
        });

        test('Should throw an error when task is missing version key', () => {
            assert.throws(() => utils.getTaskVersion({}));
        });

        test('Should throw correct error when task version object is missing a key', () => {
            const badTask = helpers.createSampleTaskContents(0, 1);
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has wrong case key', () => {
            const badTask = helpers.createSampleTaskContents(0, 1);
            badTask.version.patch = 2;
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has NaN string property', () => {
            const badTask = helpers.createSampleTaskContents(0, 1, 'fooBaRoo');
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has decimal string property', () => {
            const badTask = helpers.createSampleTaskContents('0', '1', '1.3');
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has empty string property', () => {
            const badTask = helpers.createSampleTaskContents('', '1', '0');
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has decimal numeric property', () => {
            const badTask = helpers.createSampleTaskContents(0, 1, 1.3);
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has negative whole number string property', () => {
            const badTask = helpers.createSampleTaskContents('0', '1', '-1');
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should throw correct error when task version object has negative whole number numeric property', () => {
            const badTask = helpers.createSampleTaskContents(0, 1, -2);
            assert.throws(() => utils.getTaskVersion(badTask), invalidTaskErrorMessage);
        });

        test('Should return correct version when task version object contains numerical zeroes', () => {
            assert.deepEqual(utils.getTaskVersion(helpers.createSampleTaskContents(0, 1, 0)), '0.1.0');
        });

        test('Should return correct version when task version object contains string zeroes', () => {
            assert.deepEqual(utils.getTaskVersion(helpers.createSampleTaskContents('0', '1', '2')), '0.1.2');
        });
    });

    suite('bumpVersion Suite:', () => {
        let semverMajorStub;
        let semverMinorStub;
        let semverPatchStub;
        let taskJson;
        const version = helpers.initialVersion;
        const defaultOpts = helpers.defaultOptions;
        const errorMessage = 'Ouch!';
        const bumpedPatch = helpers.patchVersion + 1;

        setup(() => {
            taskJson = helpers.createSampleTaskContents(helpers.majorVersionStr, helpers.minorVersionStr, helpers.patchVersionStr);
            semver.major('v1.0.0');
            semver.minor('v1.0.0');
            semver.patch('v1.0.0');
            semverMajorStub = Sinon.stub(semver, 'major').callsFake(() => helpers.majorVersion);
            semverMinorStub = Sinon.stub(semver, 'minor').callsFake(() => helpers.minorVersion);
            semverPatchStub = Sinon.stub(semver, 'patch').callsFake(() => helpers.patchVersion);
        });

        teardown(() => {
            taskJson = null;
        });

        test('Should throw an error when semver inc throws an error', () => {
            semverIncStub.throws(() => new Error(errorMessage));
            assert.throws(() => utils.bumpVersion(taskJson, version, defaultOpts), errorMessage);
            assert.isTrue(semverIncStub.calledWith(version, defaultOpts.type));
        });

        test('Should throw an error when retrieving major throws an error', () => {
            semverMajorStub.throws(() => new Error(errorMessage));
            assert.throws(() => utils.bumpVersion(taskJson, version, defaultOpts), errorMessage);
        });

        test('Should throw an error when retrieving minor throws an error', () => {
            semverMinorStub.throws(() => new Error(errorMessage));
            assert.throws(() => utils.bumpVersion(taskJson, version, defaultOpts), errorMessage);
        });

        test('Should throw an error when retrieving patch throws an error', () => {
            semverPatchStub.throws(() => new Error(errorMessage));
            assert.throws(() => utils.bumpVersion(taskJson, version, defaultOpts), errorMessage);
        });

        test('Should correctly set bumped version properties when no property type is specified', () => {
            semverPatchStub.callsFake(() => bumpedPatch);
            const bumpedVersion = utils.bumpVersion(taskJson, version, defaultOpts);
            assert.deepEqual(bumpedVersion, helpers.bumpedVersion);
            assert.deepEqual(taskJson.version.Major, helpers.majorVersion);
            assert.deepEqual(taskJson.version.Minor, helpers.minorVersion);
            assert.deepEqual(taskJson.version.Patch, bumpedPatch);
        });

        test('Should correctly set bumped version properties when property type is set to string', () => {
            semverPatchStub.callsFake(() => bumpedPatch.toString());
            const opts = {
                versionPropertyType: helpers.stringVersionPropertyType
            };
            const bumpedVersion = utils.bumpVersion(taskJson, version, opts);
            assert.deepEqual(bumpedVersion, helpers.bumpedVersion);
            assert.deepEqual(taskJson.version.Major, helpers.majorVersionStr);
            assert.deepEqual(taskJson.version.Minor, helpers.minorVersionStr);
            assert.deepEqual(taskJson.version.Patch, bumpedPatch.toString());
        });
    });
});
