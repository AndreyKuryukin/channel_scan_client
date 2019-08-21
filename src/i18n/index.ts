
const useSecondary = false;

type TranslationKey = string;
type PrimaryValue = string;
type SecondaryValue = string;

export type LocalizerComposition = [
    TranslationKey, PrimaryValue, SecondaryValue
];

type Localizer = {
    [k: string]: LocalizerComposition | Localizer,
};

type TranslationMap = {
    [k: string]: string | TranslationMap | any,
};

export const ls = (
    key: TranslationKey,
    primaryValue: PrimaryValue,
    secondaryValue: SecondaryValue): string => {
    // return translationSrc[key]
    return useSecondary ? secondaryValue : primaryValue;
};

export const la = (
    key: TranslationKey,
    primaryValue: PrimaryValue,
    secondaryValue: SecondaryValue): () =>
        string => () => ls(key, primaryValue, secondaryValue);

export const lz = (map: Localizer): TranslationMap =>
    Object.entries(map).reduce((acc: TranslationMap, entry) => {
        const [key, value] = entry;
        if (value.isArray) {
            const [translationKey, primaryValue, secondaryValue] = <LocalizerComposition>value;
            Object.defineProperty(acc, key, {
                get: () => {
                    return ls(translationKey, primaryValue, secondaryValue);
                },
                value: primaryValue,
            });
        } else if (typeof value === 'object') {
            acc[key] = lz(<Localizer>value);
        }
        return acc;
        // tslint:disable-next-line: align
    }, {});
