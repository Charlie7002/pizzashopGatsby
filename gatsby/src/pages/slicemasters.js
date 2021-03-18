import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const PersonsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const PersonStyle = styled.div`
  a {
    text-decoration: none;
    .gatsby-image-wrapper {
      height: 400px;
    }
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    z-index: 2;
    position: relative;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function slicemasters({ data, pageContext }) {
  const persons = data.slicemasters.nodes;
  console.log(data);
  console.log(`total count :${data.slicemasters.totalCount}`);

  return (
    <>
      <SEO
        title={`Slicemasters - Page ${
          pageContext.currentPage ? pageContext.currentPage : 1
        }`}
      />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <PersonsGrid>
        {persons.map((person) => (
          <PersonStyle key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
              <Img fluid={person.image.asset.fluid} />
              <p className="description">{person.description}</p>
            </Link>
          </PersonStyle>
        ))}
      </PersonsGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
      }
    }
  }
`;
