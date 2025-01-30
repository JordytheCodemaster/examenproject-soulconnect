import React, { useState, useEffect } from "react";

const MultiSelect = ({ options = [], onChange, selectedValues = [] }) => {
    const [selected, setSelected] = useState(Array.isArray(selectedValues) ? selectedValues : []);

    useEffect(() => {
        setSelected(Array.isArray(selectedValues) ? selectedValues : []);
    }, [selectedValues]);

    const handleToggle = (value) => {
        const updatedSelected = selected.includes(value)
            ? selected.filter((item) => item !== value) // Verwijder optie
            : [...selected, value]; // Voeg optie toe

        setSelected(updatedSelected);
        onChange(updatedSelected); // Stuur naar de ouder
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option, index) => {
                const isSelected = selectedValues.includes(option); // Controleer of geselecteerd
                return (
                    <div
                        key={index}
                        className={`cursor-pointer px-3 py-1 rounded-lg border ${isSelected
                            ? "bg-purple-500 text-white border-purple-500"
                            : "bg-white text-black border-gray-300"
                            }`}
                        onClick={() => handleToggle(option)}
                    >
                        {option}
                    </div>
                );
            })}
        </div>
    );
};

export default MultiSelect;
