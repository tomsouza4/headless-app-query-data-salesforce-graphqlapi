
import { useQuery, gql } from "@apollo/client";

const GET_CONTACTS = gql`
query getContacts(
    $likeParams : String,
    $limit : Int,
    $after : String
) {
    uiapi {
    query {
        Contact (
            first: $limit,
            orderBy: { Name: { order: ASC } },
            where: { Name: { like: $likeParams } },
            after: $after
        ){
        edges {
          node {
            Id
            Name {
              value
            }
            Phone {
              value
            }
            CreatedDate {
              displayValue
            }
            Email {
              value
            }
            Account {
              Name {
                value
              }
              Rating {
                value
                displayValue
              }
              AnnualRevenue {
                value
                displayValue
              }
            }
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  } 
}`

export const useContacts = (likeParams, limit, after) => {

    const { error, data, loading } = useQuery(GET_CONTACTS, {
        variables: {
            likeParams,
            limit,
            after
        }
    });

    return { error, data, loading }
}