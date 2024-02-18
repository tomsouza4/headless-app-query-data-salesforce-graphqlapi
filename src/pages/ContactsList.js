import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { useContacts } from "../hooks/useContacts";
import { TableFooter, TablePagination, Button } from '@mui/material';

export default function ContactsList() {
    // const { id } = useParams();
    const { error, data, loading } = useContacts();
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
    if (error) return <div>something went wrong: {error.message} </div>;
    

    const handleSearch = (e, field) => {
        setSearchTerm({ ...searchTerm, [field]: e.target.value });
    };

    const filterContacts = (contacts) => {
        return contacts.filter((contact) => {
            return Object.keys(searchTerm).every((key) => {
                const searchTermValue = searchTerm[key] || '';
                const contactValue = contact.node[key]?.value || '';
                return contactValue.toLowerCase().includes(searchTermValue.toLowerCase());
            });
        });
    };
    
    return (
        <div>
            <h1>Contacts</h1>
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
                                        label="Email"
                                        onChange={(e) => handleSearch(e, 'Email')}
                                        value={searchTerm.Email || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Account Name"
                                        onChange={(e) => handleSearch(e, 'Account')}
                                        value={searchTerm.Account || ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Annual Revenue"
                                        onChange={(e) => handleSearch(e, 'AnnualRevenue')}
                                        value={searchTerm.AnnualRevenue || ''}
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
                        {filterContacts(data.uiapi.query?.Contact.edges).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
                                <TableRow key={contact.node.Id}>
                                    <TableCell>
                                        <Link to={`https://wise-goat-rgjb32-dev-ed.trailblaze.my.salesforce.com/${contact.node.Id}`}>
                                            {contact.node.Name.value}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{contact.node.Phone.value}</TableCell>
                                    <TableCell>{contact.node.Email.value}</TableCell>
                                    <TableCell>{contact.node.Account?.Name.value}</TableCell>
                                    <TableCell>{contact.node.Account?.AnnualRevenue?.displayValue}</TableCell>
                                    <TableCell>{contact.node.CreatedDate.displayValue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                colSpan={6}
                                count={data.uiapi.query?.Contact.edges.length || 0}
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
            <Link to="/Accounts">
                <Button variant="contained" color="primary">
                    Go to Accounts page
                </Button>
            </Link>
        </div>
    );
}