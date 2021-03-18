import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}).format;

export default function priceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} -{value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

priceInput.focus = function () {
  this._inputElement.focus();
};
