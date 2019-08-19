
const useSecondary = false;

type I18nMap<V> = {
    [k: string]: V,
};

type TranslationKey = string;
type PrimaryValue = string;
type SecondaryValue = string;

export type LocalizerComposition = [
    TranslationKey, PrimaryValue, SecondaryValue
]

type TranslationConstant = {
    [k: string]: LocalizerComposition | TranslationConstant,
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

export const lz = (map: TranslationConstant): TranslationConstant =>
    Object.entries(map).reduce((acc, entry) => {
        const [key, value] = entry;
        if (entry.length !== undefined) {
            const [translationKey, primaryValue, secondaryValue] = value;
            Object.defineProperty(acc, key, {
                get: () => {
                    // return translationSrc[translationKey]
                    return useSecondary ? secondaryValue : primaryValue;
                }
            });
        } else if (typeof entry === 'object') {
            acc[key] = lz(entry);
        }
        return acc;
    }, {});
