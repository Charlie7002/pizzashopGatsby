import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SingleSliceMaster({ data: { sliceMaster } }) {
  return (
    <>
      <SEO title={sliceMaster.name} image={sliceMaster.image.asset.src} />
      <div className="center">
        <Img fluid={sliceMaster.image.asset.fluid} />
        <h2 className="mark"> {sliceMaster.name}</h2>
        <p>{sliceMaster.description}</p>
      </div>
    </>
  );
}

// this needs to be dynamic based on the slug passed via context
export const query = graphql`
  query($slug: String!) {
    sliceMaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
