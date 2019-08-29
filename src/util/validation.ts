import _ from 'lodash';
import { lz } from '../i18n';

const validators = {
    required: (value: any, testValue: any) => {
        const pureValue = _.isString(value) ? value.trim() : value;

        return testValue ? (value === '0' || value === 0 || !!pureValue === testValue) : !testValue;
    },
    min: (value:number, testValue: number) => value >= testValue,
    max: (value:number, testValue:number) => value <= testValue,
    notEmpty: (value: {} | [], testValue: boolean) => !_.isEmpty(value) === testValue,
    match: (value: string, pattern: string) => _.isRegExp(pattern) && (new RegExp(pattern)).test(value),
    minLength: (value, length) => {
        if (!value) return false;
        const pureValue = _.isString(value) ? value.trim() : value.toString();

        return pureValue.length >= length;
    },
    notAllowedStrings: (value, strings) => 
        Array.isArray(strings) ? strings.reduce((result, string) => result && value !== string, true) : true
};

const defaultMessages = {
    required: createLocalizer('REQUIRED_ERROR_MESSAGE', 'Это поле обязательно для заполнения'),
    min: createLocalizer('MIN_ERROR_MESSAGE', 'Значение меньше минимального'),
    max: createLocalizer('MAX_ERROR_MESSAGE', 'Значение больше максимального'),
    notEmpty: createLocalizer('NOT_EMPTY_ERROR_MESSAGE', 'Значение не должно быть пустым'),
    match: createLocalizer('MATCH_ERROR_MESSAGE', 'Проверьте правильность введённого значения'),
    minLength: createLocalizer('MIN_LENGTH_ERROR_MESSAGE', 'Длина значения меньше необходимого'),
    notAllowedStrings: createLocalizer('NOT_ALLOWED_STRINGS_ERROR_MESSAGE', 'Проверьте правильность введённого значения')
};

const validateValue = (value, config, customValidators) =>
    _.reduce(config, (result, testValue, validatorName) => {
        const validator = _.get(validators, validatorName, customValidators[validatorName]);
        const res = { ...result };
        if (_.isFunction(validator)) {
            const isValid = validator(value, testValue);
            if (!isValid) {
                res[validatorName] = isValid;
            }
        }
        return res;
    }, {});

const mapErrors = (valueResult, messages) =>
    _.reduce(valueResult, (result, isValid, validatorName) => {
        if (!isValid) {
            const title = _.get(messages, validatorName, '');
            const severity = 'CRITICAL';
            const type = 'VALIDATION';
            return {
                type,
                title: _.isFunction(title) ? title() : title,
                severity,
                validatorName
            };
        }
        return result;
    }, {});

export const validateForm = (form, config, messages = {}, customValidators = {}, prefix) =>
    _.reduce(config, (result, valueConfig, fieldName) => {
        const value = _.get(form, fieldName);
        const res = { ...result };
        if (_.isFunction(valueConfig)) {
            const cfg = valueConfig();
            const subForm = _.get(form, fieldName);
            const formPrefix = [prefix, fieldName].join('.');
            const subFormResult = validateForm(subForm, cfg, messages, customValidators, formPrefix);
            if (!_.isEmpty(subFormResult)) {
                res[fieldName] = subFormResult;
            }
            return res;
        }

        if (_.isArray(valueConfig)) {
            const [selfConfig, ...elemConfig] = valueConfig;
            const selfResult = validateValue(value, selfConfig, { ...validators, ...customValidators });
            if (!_.isEmpty(selfResult)) {
                res[fieldName] = mapErrors(selfResult, { ...defaultMessages, ...messages });
            } else {
                const defaultElemCfg = elemConfig[0];
                const subFormsResult = value.reduce((subforms, subForm, index) => {
                    const indexCfg = elemConfig[index] || defaultElemCfg;
                    const subformErrors = validateForm(subForm, indexCfg, messages, customValidators);
                    const subformsRes = [...subforms];

                    if (!_.isEmpty(subformErrors)) {
                        subformsRes[index] = subformErrors;
                    }

                    return subformsRes;
                }, []);

                if (!_.isEmpty(subFormsResult)) {
                    res[fieldName] = subFormsResult;
                }
            }

            return res;
        }
        // Костыль для простых значений в массиве
        let valueResult;
        if (_.isNumber(form) || _.isString(form) || _.isBoolean(form)) {
            valueResult = validateValue(form, {[fieldName]: valueConfig}, { ...validators, ...customValidators });
        } else {
            valueResult = validateValue(value, valueConfig, { ...validators, ...customValidators });
        }

        const errorMessages = mapErrors(valueResult, { ...defaultMessages, ...messages });
        if (!_.isEmpty(errorMessages)) {
            res[fieldName] = errorMessages;
        }
        return res;
    }, {});

export const handleErrors = (errorConfig, errors = []) => _.reduce(errors, (result, error = {}) => {
    const { code, type } = error;
    const errorCfg = _.get(errorConfig, code, {});
    const { title, path, severity } = errorCfg;
    const err = {};
    if (path) {
        _.set(err, path, { title, severity, type });
    }
    return _.merge(result, err);
}, {});
