import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slice`)
    .items([
      // create new sub
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document id (no more random number)
            .documentId('downtown')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
