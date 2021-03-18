import React from 'react';
import { ItemGrid, ItemStyle } from '../styles/Grid';

export default function LoadingGrid({ count }) {
  return (
    <ItemGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyle key={`${i}loading`}>
          <span className="mark">Loading ...</span>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="loading"
            width="500"
            height="400"
          />
        </ItemStyle>
      ))}
    </ItemGrid>
  );
}
