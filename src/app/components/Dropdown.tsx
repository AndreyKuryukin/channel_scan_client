import * as React from 'react';
import * as ClickOutside from 'react-click-outside';
import * as styles from './styles.scss';
import { UnitOfMeasure } from './interfaces';

export interface DropdownProps {
    menuItems: UnitOfMeasure[];
    toggle(): void;
    onSelect(unit: UnitOfMeasure): void;
}

class Dropdown extends React.PureComponent<DropdownProps> {

    public handleClickOutside = () => {
        this.props.toggle();
    }

    private renderDropdownItems(selectItems: UnitOfMeasure[]): JSX.Element[] {
        return selectItems.map(item =>
            <span
                key={item.value}
                onClick={() => {
                    this.props.onSelect(item);
                    this.props.toggle();
                }}
            >
                {item.title}
            </span>);
    }

    render() {
        const { menuItems } = this.props;
        return <div className={styles.dropdownContent}>
            {this.renderDropdownItems(menuItems)}
        </div>;
    }
}

export default ClickOutside(Dropdown);
