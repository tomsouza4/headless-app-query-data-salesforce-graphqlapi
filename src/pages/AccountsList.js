import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { useAccounts } from "../hooks/useAccounts";
import { TableFooter, TablePagination, Button } from '@mui/material';

export default function AccountsList() {
    const { error, data, loading } = useAccounts();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

    // Handle Page Controls
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 when changing rows per page
    };

    if (loading) return <div>spinner...</div>;
    if (error) return <div>something went wrong</div>;

    const handleSearch = (e, field) => {
        setSearchTerm({ ...searchTerm, [field]: e.target.value });
    };

    const filterAccounts = (accounts) => {
        return accounts.filter((account) => {
            return Object.keys(searchTerm).every((key) => {
                const searchTermValue = searchTerm[key] || '';
                const accountValue = account.node[key]?.value || '';
                return accountValue.toLowerCase().includes(searchTermValue.toLowerCase());
            });
        });
    };

    return (
        <div>
            <h1>Accounts</h1>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                        <TableRow>
                                <TableCell>
                                    <TextField
                                        label="Name"
                                        onChange={(e) => handleSearch(e, 'Name')}
                                        value={searchTerm.Name || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Phone"
                                        onChange={(e) => handleSearch(e, 'Phone')}
                                        value={searchTerm.Phone || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Billing State"
                                        onChange={(e) => handleSearch(e, 'BillingState')}
                                        value={searchTerm.BillingState || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Account Type"
                                        onChange={(e) => handleSearch(e, 'Type')}
                                        value={searchTerm.Type || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Industry"
                                        onChange={(e) => handleSearch(e, 'Industry')}
                                        value={searchTerm.Industry || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Created Date"
                                        onChange={(e) => handleSearch(e, 'CreatedDate')}
                                        value={searchTerm.CreatedDate || ''}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterAccounts(data.uiapi.query?.Account.edges).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((accounts) => (
                                <TableRow key={accounts.node.Id}>
                                    <TableCell>
                                        <Link to={`https://wise-goat-rgjb32-dev-ed.trailblaze.my.salesforce.com/${accounts.node.Id}`}>
                                            {accounts.node.Name.value}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {accounts.node.Phone.value}
                                    </TableCell>
                                    <TableCell>
                                        {accounts.node.BillingState.value}
                                    </TableCell>
                                    <TableCell>
                                        {accounts.node.Type.value}
                                    </TableCell>
                                    <TableCell>
                                        {accounts.node.Industry.value}
                                    </TableCell>
                                    <TableCell>
                                        {accounts.node.CreatedDate.displayValue}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                    colSpan={6}
                                    count={data.uiapi.query?.Account.edges.length || 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Rows per page"
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
            <Link to="/contacts">
                <Button variant="contained" color="primary">
                    Go to Contacts page
                </Button>
            </Link>
        </div>
    );
}
