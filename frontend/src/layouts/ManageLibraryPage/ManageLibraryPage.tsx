import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { ChangeQuantityOfBooks } from "./components/ChangeQuantityOfBooks";
import { useAuthContext } from "../../context/AuthContext";

export const ManageLibraryPage = () => {

    const { authState } = useAuthContext();

    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(true);
    }

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Navigate to='/home' />
    }

    return (
        <div className="container">
            <div className="mt-5">
                <h3>Manage Library</h3>
                <nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={addBookClickFunction} className="nav-link active" id="nav-add-book-tab" data-bs-toggle='tab'
                        data-bs-target='#nav-add-book' type="button" role="tab" aria-controls="nav-add-book"
                        aria-selected='false'>
                        Add new book
                    </button>
                    <button onClick={changeQuantityOfBooksClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle='tab'
                        data-bs-target='#nav-quantity' type="button" role="tab" aria-controls="nav-quantity"
                        aria-selected='false'>
                        Change quantity
                    </button>
                    <button onClick={messagesClickFunction} className="nav-link" id="nav-messages-tab" data-bs-toggle='tab'
                        data-bs-target='#nav-messages' type="button" role="tab" aria-controls="nav-messages"
                        aria-selected='false'>
                        Messages
                    </button>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-add-book" role="tabpanel"
                        aria-labelledby="nav-add-book-tab">
                        <AddNewBook />
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity">
                        {changeQuantityOfBooksClick ? <ChangeQuantityOfBooks/> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
                        {messagesClick ? <AdminMessages /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}