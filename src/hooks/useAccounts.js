
import { useQuery, gql } from "@apollo/client";

const GET_ACCOUNTS = gql`
query getAccounts {
            uiapi {
                query {
                    Account(first: 200) {
                        edges {
                            node {
                                Id
                                Name {
                                    value
                                }
                                BillingState {
                                    value
                                }
                                Phone {
                                    value
                                }
                                Type {
                                    value
                                }
                                CreatedDate {
                                    displayValue
                                }
                                Industry {
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
`;

export const useAccounts = () => {

    const { error, data, loading } = useQuery(GET_ACCOUNTS);
    return { error, data, loading }

}