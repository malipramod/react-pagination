import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faClone, faChevronCircleUp, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

interface TableProps {
    filteredData: any;
    pages: Array<number>;
    totalRecords: number;
    startIndex: number;
    endIndex: number;
    currentPage: number;
    filterData: (pageNo: number) => void;
    remove: (id: string) => void;
    clone: (id: string) => void;
    moveUpDown: (id: string, direction: string) => void;
    changePageSize: (id: string) => void;
    movePagesNext: () => void;
    movePagesPrev: () => void;
}
const Table: React.SFC<TableProps> = ({ filteredData, pages, totalRecords, startIndex, endIndex, currentPage, filterData, remove, clone, moveUpDown, changePageSize, movePagesNext, movePagesPrev }) => {
    return (
        <div>
            <div className="Container">
                <div className="Fixed">
                    Select Page Size:
                    <select name="pageSize" id="pageSize" onChange={(event) => changePageSize(event?.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="Fixed">
                    {startIndex < 2 ? null : <input type="button" value="Previous" onClick={() => movePagesPrev()} />}
                    {pages.slice(0, 1).map(p => <input className={currentPage === 1 ? "Active" : ""} key={p} onClick={() => filterData(p)} type="button" value="First" />)}
                    ...
                    {pages.slice(startIndex, endIndex).map(p => <input className={currentPage === p ? "Active" : ""} key={p} onClick={() => filterData(p)} type="button" value={p} />)}
                    ....
                    {
                        pages.slice(-1).map(p => <input className={currentPage === pages.length ? "Active" : ""} key={p} onClick={() => filterData(p)} type="button" value="Last" />)
                    }
                    {endIndex < pages.length ? <input type="button" value="Next" onClick={() => movePagesNext()} /> : null}
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Rule Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((d: any) =>
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.ruleName}</td>
                                <td>{<FontAwesomeIcon onClick={() => remove(d.id)} className="Delete" icon={faTrash} />}</td>
                                <td>{<FontAwesomeIcon onClick={() => clone(d.id)} className="Clone" icon={faClone} />}</td>
                                <td>{<FontAwesomeIcon onClick={() => moveUpDown(d.id, "up")} className="UpDown" icon={faChevronCircleUp} />}</td>
                                <td>{<FontAwesomeIcon onClick={() => moveUpDown(d.id, "down")} className="UpDown" icon={faChevronCircleDown} />}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <b>Total {totalRecords}</b>
        </div>
    )
}

export default Table;