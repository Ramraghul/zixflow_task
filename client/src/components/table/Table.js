import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContacts, deleteContact, SelectedDeleteContact, updateContact } from '../../redux/actions/userContactAction';
import Loading from '../loading/Loading';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination, makeStyles, Paper, Button, Checkbox, Input, } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    },
    table: {
        minWidth: 650,
    },
    actionButtons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    pagination: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'end',
        marginBottom: theme.spacing(2),
        height: '30px',
        gap: '20px'
    },
    inputField: {
        width: '100%',
        border: 'none',
        outline: 'none',
    },
}));

function MaterialTable() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { AllUserContact, loading } = useSelector((state) => state.contact);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [editingCell, setEditingCell] = useState(null);
    const [editedCellValue, setEditedCellValue] = useState({});

    //Data Initial
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    //Create Page 
    const navigateCreateContact = () => {
        navigate('/createContact')
    };

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelected([...selected, id]);
        } else {
            setSelected(selected.filter((selectedId) => selectedId !== id));
        }
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelected(AllUserContact.map((contact) => contact.id));
        } else {
            setSelected([]);
        }
        setSelectAll(event.target.checked);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (rowIndex, field) => {
        setEditingCell({ rowIndex, field });
        setEditedCellValue(AllUserContact[rowIndex][field]);
    };

    //Data Update
    const handleEditComplete = (rowId, field, value) => {
        let updateData;
        if (field === 'address') {
            delete value.address
            updateData = {
                id: rowId,
                [field]: value
            }
        } else {
            updateData = {
                id: rowId,
                [field]: value
            }
        }
        dispatch(updateContact(updateData));
        Swal.fire(
            `Your Contact ${[field]} has been Updated Successfully.`,
            'success'
        ).then(() => {
            dispatch(fetchContacts());
            setEditingCell(null);
        });
    };

    const handleInputBlur = (id, field, value) => {
        handleEditComplete(id, field, { ...editedCellValue, [field]: value });
    };

    //Single Data Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Contact!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteContact(id));
                Swal.fire(
                    'Deleted!',
                    'Your Contact has been deleted.',
                    'success'
                ).then(() => {
                    dispatch(fetchContacts());
                });
            }
        });
    };

    //Multiple Data Delete 
    const handleDeleteSelected = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Contact!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(SelectedDeleteContact(selected));
                Swal.fire(
                    'Deleted!',
                    'Your Contact has been deleted.',
                    'success'
                ).then(() => {
                    dispatch(fetchContacts());
                });
            }
        });
    };

    return (
        <>
            {loading ? <Loading /> : (
                <>
                    <div className={classes.toolbar}>
                        <Button variant="contained" onClick={navigateCreateContact} color="primary">
                            New Contact
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDeleteSelected} disabled={selected.length === 0}>
                            Delete Selected
                        </Button>
                    </div>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            inputProps={{ 'aria-label': 'select all contacts' }}
                                        />
                                    </TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {AllUserContact.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(row.id)}
                                                onChange={(event) => handleCheckboxChange(event, row.id)}
                                                inputProps={{ 'aria-label': 'select contact' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.field === 'firstName' ? (
                                                <Input
                                                    className={classes.inputField}
                                                    value={editedCellValue}
                                                    onChange={(e) => setEditedCellValue(e.target.value)}
                                                    onBlur={() => handleEditComplete(row.id, 'firstName', editedCellValue)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span onClick={() => handleEdit(rowIndex, 'firstName')}>{row.firstName}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.field === 'lastName' ? (
                                                <Input
                                                    className={classes.inputField}
                                                    value={editedCellValue}
                                                    onChange={(e) => setEditedCellValue(e.target.value)}
                                                    onBlur={() => handleEditComplete(row.id, 'lastName', editedCellValue)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span onClick={() => handleEdit(rowIndex, 'lastName')}>{row.lastName}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.field === 'email' ? (
                                                <Input
                                                    className={classes.inputField}
                                                    value={editedCellValue}
                                                    onChange={(e) => setEditedCellValue(e.target.value)}
                                                    onBlur={() => handleEditComplete(row.id, 'email', editedCellValue)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span onClick={() => handleEdit(rowIndex, 'email')}>{row.email}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.field === 'address' ? (
                                                <div>
                                                    <Input
                                                        className={classes.inputField}
                                                        placeholder="Address Line 1"
                                                        value={editedCellValue.line1}
                                                        onChange={(e) => setEditedCellValue(prevState => ({ ...prevState, line1: e.target.value }))}
                                                        onBlur={() => handleInputBlur(row.id, 'address', 'line1')}
                                                    />
                                                    <Input
                                                        className={classes.inputField}
                                                        placeholder="Address Line 2"
                                                        value={editedCellValue.line2}
                                                        onChange={(e) => setEditedCellValue(prevState => ({ ...prevState, line2: e.target.value }))}
                                                        onBlur={() => handleInputBlur(row.id, 'address', 'line2')}
                                                    />
                                                    <Input
                                                        className={classes.inputField}
                                                        placeholder="City"
                                                        value={editedCellValue.city}
                                                        onChange={(e) => setEditedCellValue(prevState => ({ ...prevState, city: e.target.value }))}
                                                        onBlur={() => handleInputBlur(row.id, 'address', 'city')}
                                                    />
                                                    <Input
                                                        className={classes.inputField}
                                                        placeholder="Country"
                                                        value={editedCellValue.country}
                                                        onChange={(e) => setEditedCellValue(prevState => ({ ...prevState, country: e.target.value }))}
                                                        onBlur={() => handleInputBlur(row.id, 'address', 'country')}
                                                    />
                                                    <Input
                                                        className={classes.inputField}
                                                        placeholder="ZIP Code"
                                                        value={editedCellValue.zipCode}
                                                        onChange={(e) => setEditedCellValue(prevState => ({ ...prevState, zipCode: e.target.value }))}
                                                        onBlur={() => handleInputBlur(row.id, 'address', 'zipCode')}
                                                    />
                                                </div>
                                            ) : (
                                                <span onClick={() => handleEdit(rowIndex, 'address')}>
                                                    {`${row.address.line1}, ${row.address.line2 ? `${row.address.line2},` : ''} ${row.address.city}, ${row.address.country}, ${row.address.zipCode}`}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.field === 'phone' ? (
                                                <Input
                                                    className={classes.inputField}
                                                    value={editedCellValue}
                                                    onChange={(e) => setEditedCellValue(e.target.value)}
                                                    onBlur={() => handleEditComplete(row.id, 'phone', editedCellValue)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span onClick={() => handleEdit(rowIndex, 'phone')}>{row.phone}</span>
                                            )}
                                        </TableCell>
                                        <TableCell className={classes.actionButtons}>
                                            <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={AllUserContact.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className={classes.pagination}
                    />
                </>
            )}
        </>
    );
}

export default MaterialTable;
