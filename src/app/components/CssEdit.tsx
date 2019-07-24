import * as React from 'react';
import * as styles from './styles.scss';
import Dropdown from './Dropdown';
import { UnitOfMeasure } from './interfaces';

export interface CssEditProps {
    menuItems: UnitOfMeasure[];

    onChange?(value: string): void;
}

interface State {
    selectedUnit?: UnitOfMeasure;
    showDropDown?: boolean;
    value?: string;
}

interface ValueInputProps {
    onChange(value: string): void;

    value: string;
    unit: UnitOfMeasure;
}

const ValueInput = function (props: ValueInputProps) {
    let [value, setValue] = React.useState(props.value);
    const [focused, setFocused] = React.useState(false);
    if (!focused) {
        value = props.unit.hasValue ? props.value : props.unit.title;
    }
    return <input
        value={value}
        className={styles.valueInput}
        onBlur={(e) => {
            props.onChange(e.target.value);
            setFocused(false);
        }}
        onFocus={() => {
            setValue(`${props.unit.hasValue ? props.value : ''}${props.unit.title}`);
            setFocused(true);
        }}
        onChange={(e) => {
            setValue(e.target.value);
        }}
    />;
};

class CssEdit extends React.PureComponent<CssEditProps, State> {

    private defaultValue = '0';

    constructor(props: CssEditProps) {
        super(props);
        this.state = {
            selectedUnit: props.menuItems[0],
            value: this.defaultValue,
            showDropDown: false,
        };
    }

    private setUnit = (selectedUnit: UnitOfMeasure) => {
        this.setValue(
            selectedUnit.hasValue ? this.state.value || this.defaultValue : '',
            selectedUnit);
        this.toggleDropdown();
    }

    private setValue = (value: string, selectedUnit: UnitOfMeasure) => {
        this.setState({ value, selectedUnit });
        this.props.onChange(`${value}${selectedUnit.title}`);
    }

    private findUnitByTitle = (title: string): UnitOfMeasure | undefined => {
        return this.props.menuItems.find(item => item.title === title);
    }

    private parseValue = (inputText: string) => {
        const predefinedMatch = inputText.match(/^[a-zA-Z]*$/);
        const valueUnitMatch = inputText.match(/^([\d]*\.?[\d]*)([a-zA-Z]*)$/);
        if (predefinedMatch) {
            const [unit] = predefinedMatch;
            const unitOfMeasure = this.findUnitByTitle(unit);
            if (unitOfMeasure) {
                this.setValue('', unitOfMeasure);
            }
        } else if (valueUnitMatch) {
            const [fullMatch, value, unit] = valueUnitMatch;
            const unitOfMeasure = unit ? this.findUnitByTitle(unit) : this.state.selectedUnit;
            if (unitOfMeasure && unitOfMeasure.hasValue) {
                // Если значение не задано то оно по-умолчанию равно 0
                this.setValue(value || this.defaultValue, unitOfMeasure);
            }
        }
    }

    private toggleDropdown = () => {
        this.setState({ showDropDown: !this.state.showDropDown });
    }

    private renderButton(selectedUnit: UnitOfMeasure): JSX.Element {
        return <button
            className={styles.dropbtn}
            onClick={this.toggleDropdown}
        >
            {selectedUnit.hasValue ? selectedUnit.title : '-'}
        </button>;
    }

    render() {
        const { menuItems } = this.props;
        const { value, selectedUnit, showDropDown } = this.state;
        return <div className={styles.workSpace}>
            <ValueInput
                value={value}
                onChange={this.parseValue}
                unit={selectedUnit}
            />
            <div>
                {this.renderButton(selectedUnit)}
                {showDropDown && <Dropdown
                    menuItems={menuItems}
                    toggle={this.toggleDropdown}
                    onSelect={this.setUnit}
                />}
            </div>
        </div>;
    }
}

export default CssEdit;
