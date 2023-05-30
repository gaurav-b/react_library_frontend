import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean, returnBook: any, renewLoan: any }> = (props) => {

    return (
        <div className="modal fade" id={props.mobile ?
            `mobilemodal${props.shelfCurrentLoan.book.id}`
            :
            `modal${props.shelfCurrentLoan.book.id}`
        } data-bs-backdrop='static' data-bs-keyboard='false'
            aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentLoan.book.id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='modal-header'>
                        <h5 className="modal-title" id='staticBackdropLable'>
                            Loan Options
                        </h5>
                        <button type='button' className="btn-close" data-bs-dismiss='modal' aria-label='Close' />
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {props.shelfCurrentLoan.book?.img ?
                                            <img src={props.shelfCurrentLoan.book?.img} alt="Book" width='56' height='87' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} alt="Book" width='56' height='87' />
                                        }
                                    </div>
                                    <div className="col-3">
                                        <h6>{props.shelfCurrentLoan.book.author}</h6>
                                        <h6>{props.shelfCurrentLoan.book.title}</h6>
                                    </div>
                                </div>
                                <hr />
                                {props.shelfCurrentLoan.daysLeft > 0 &&
                                    <p className='text-secondary'>
                                        Due in {props.shelfCurrentLoan.daysLeft} days.
                                    </p>
                                }

                                {props.shelfCurrentLoan.daysLeft === 0 &&
                                    <p className='text-success'>
                                        Due today.
                                    </p>
                                }

                                {props.shelfCurrentLoan.daysLeft === 0 &&
                                    <p className='text-success'>
                                        Past due by {props.shelfCurrentLoan.daysLeft} days.
                                    </p>
                                }
                                <div className="list-group mt-3">
                                    <button className="list-group-item list-group-item-action" aria-current='true' 
                                        data-bs-dismiss='modal' onClick={() => props.returnBook(props.shelfCurrentLoan.book.id)}>
                                            Return Book
                                    </button>
                                    <button data-bs-dismiss='modal' 
                                        onClick={
                                            props.shelfCurrentLoan.daysLeft < 0 
                                            ?
                                            (e) => e.preventDefault 
                                            :
                                            () => props.renewLoan(props.shelfCurrentLoan.book.id)
                                        }
                                        className={
                                            props.shelfCurrentLoan.daysLeft < 0 ?
                                                'list-group-item list-group-item-action inactiveLink' :
                                                'list-group-item list-group-item-action'
                                        }>
                                        {props.shelfCurrentLoan.daysLeft < 0 ?
                                            'Late dues cannot be renewed' : 'Renew loan for 7 days' 
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondayr" type="button" data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}