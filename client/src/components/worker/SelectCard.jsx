import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Component that shows the worker and the part, making both sellectable
 * @returns React component
 */
export default function SelectCard({
    identifier, name, siblingSelected, setSiblingSelected, onClickAction, type,
}) {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(identifier === siblingSelected);
    }, [siblingSelected]);

    const handleClick = () => {
        if (!active) {
            setActive(true);
        }
    };

    useEffect(() => {
        if (active) {
            onClickAction(identifier, type);
            setSiblingSelected(identifier);
        }
    }, [active]);
    return (
        <button type="button" className={`select-card${active ? '-active' : ''} card-shadow btn text-center w-100 py-4 mt-4 mb-5`} onClick={handleClick}>
            <p>{name}</p>
        </button>
    );
}
SelectCard.propTypes = {
    name: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    siblingSelected: PropTypes.string.isRequired,
    setSiblingSelected: PropTypes.func.isRequired,
    onClickAction: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};
