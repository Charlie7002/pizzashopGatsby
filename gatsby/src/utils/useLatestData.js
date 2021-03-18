import { useEffect, useState } from 'react';

export default function useLatestDate() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  // use side effect to fetch data from graphql endpoint

  useEffect(function () {
    // run when the component load fetch data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
                _id
                image{
                  asset{
                    url
                    metadata{
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image{
                  asset{
                    url
                    metadata{
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return { hotSlices, slicemasters };
}
