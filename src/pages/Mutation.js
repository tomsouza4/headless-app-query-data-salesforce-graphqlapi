import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PRODUCT = gql`
    mutation createProduct($name: String!, $quantityPerUnit: Int!) {
        createProduct(record: {
            name: $name
            quantityPerUnit: $quantityPerUnit
        }){
            record {
                name
            }
        }
    }`

export default function Mutation() {

    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT, {
        variables: {
            name: "hotdog",
            quantityPerUnit: 4
        }
    });

    return <div>
            <button onClick={() => createProduct()}>Create</button>
          </div>;
}