
const useSecondary = false;

type I18nMap<V> = {
    [k: string]: V
};

type TranslationKey = string;
type PrimaryValue = string;
type SecondaryValue = string;

export type LocalizerComposition = [
    TranslationKey, PrimaryValue, SecondaryValue
]

export const ls = (key: TranslationKey, primaryValue: PrimaryValue, secondaryValue: SecondaryValue): () => string => {
    return useSecondary ? () => secondaryValue : () => primaryValue;
}

export const localizer = (map: I18nMap<LocalizerComposition>): I18nMap<string> => {
    return Object.entries(map).reduce((acc, entry) => {
        const [key, value] = entry;
        const [translationKey, primaryValue, secondaryValue] = value;
        Object.defineProperty(acc, key, {
            get: () => {
                // return translationSrc[translationKey]
                return useSecondary ? secondaryValue : primaryValue;
            }
        });
        return acc;
    }, {});
}
