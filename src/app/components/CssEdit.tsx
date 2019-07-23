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

class CssEdit extends React.PureComponent<CssEditProps, State> {

    constructor(props: CssEditProps) {
        super(props);
        this.state = {
            selectedUnit: props.menuItems[ 0 ],
            value: '',
            showDropDown: false,
        };
    }

    private selectUnit = (unit: UnitOfMeasure) => {
        if (!unit.hasValue) {
            this.setValue(unit.value, unit);
        } else if (!this.state.selectedUnit.hasValue) {
            this.setValue('', unit);
        } else {
            this.setValue(this.state.value, unit);
        }
        this.toggleDropdown();
    };

    private setValue = (value: string, selectedUnit: UnitOfMeasure) => {
        this.setState({ selectedUnit, value});
        this.props.onChange(`${value}${selectedUnit.hasValue ? selectedUnit.title : ''}`);
    };

    private renderInput(value: string, selectedUnit: UnitOfMeasure): JSX.Element {
        return <input
            value={value}
            className={styles.valueInput}
            type={selectedUnit.hasValue ? 'number' : 'text'}
            onChange={(e) => {
                selectedUnit.hasValue && this.setValue(String(e.target.value), selectedUnit);
            }}
        />;
    }

    private toggleDropdown = () => {
        this.setState({ showDropDown: !this.state.showDropDown });
    }

    private renderButton(selectedUnit: UnitOfMeasure): JSX.Element {
        const {} = selectedUnit;
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
            {this.renderInput(value, selectedUnit)}
            <div>
                {this.renderButton(selectedUnit)}
                {showDropDown && <Dropdown
                    menuItems={menuItems}
                    toggle={this.toggleDropdown}
                    onSelect={this.selectUnit}
                />}
            </div>

        </div>;
    }
}

export default CssEdit;
