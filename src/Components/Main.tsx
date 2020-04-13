import React from 'react';
import Table from './Table';
import { RuleData } from '../data'

interface OwnProps { }

interface OwnState {
    data: any;
    filteredData: any,
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    pages: Array<number>;
    startIndex: number;
    endIndex: number;
}

export default class Main extends React.Component<OwnProps, OwnState>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: RuleData.data,
            filteredData: RuleData.data.slice(0, 10),
            currentPage: 1,
            pageSize: 10,
            totalPages: Math.ceil(RuleData.data.length / 10),
            startPage: 1,
            endPage: Math.ceil(RuleData.data.length / 10),
            pages: Array.from({ length: Math.ceil(RuleData.data.length / 10) }, (v, i) => i + 1),
            startIndex: 1,
            endIndex: 4
        }
        this.filterData = this.filterData.bind(this);
        this.remove = this.remove.bind(this);
        this.clone = this.clone.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.moveUpDown = this.moveUpDown.bind(this);
        this.movePagesNext = this.movePagesNext.bind(this);
        this.movePagePrev = this.movePagePrev.bind(this);
    }

    filterData(index: number) {
        this.setState({ currentPage: index }, () => {
            const updatedFilterData = this.state.data.slice((this.state.pageSize * (this.state.currentPage - 1)), (this.state.pageSize * (this.state.currentPage)));
            this.setState({ filteredData: updatedFilterData });
        });
    }

    remove(id: string) {
        const updatedData = this.state.data.filter((d: any) => d.id !== id);
        this.setState({ data: updatedData }, () => {
            const updatedFilterData = this.state.data.slice((this.state.pageSize * (this.state.currentPage - 1)), (this.state.pageSize * (this.state.currentPage)));
            const updatePages = Array.from({ length: Math.ceil(this.state.data.length / this.state.pageSize) }, (v, i) => i + 1)
            this.setState({ filteredData: updatedFilterData, pages: updatePages });
        });
    }

    clone(id: string) {
        const dataTobeCloned = this.state.data.filter((d: any) => d.id === id);
        const updatedCloneData = dataTobeCloned.map((dtc: any) => { return { ...dtc, id: Date.now().toString() } });
        const updatedData = [...this.state.data, ...updatedCloneData];
        this.setState({ data: updatedData }, () => {
            const updatedFilterData = this.state.data.slice((this.state.pageSize * (this.state.currentPage - 1)), (this.state.pageSize * (this.state.currentPage)));
            const updatePages = Array.from({ length: Math.ceil(this.state.data.length / this.state.pageSize) }, (v, i) => i + 1)
            this.setState({ filteredData: updatedFilterData, pages: updatePages });
        });
    }

    changePageSize(pageSize: any) {
        this.setState({ pageSize: parseInt(pageSize) }, () => {
            const updatePages = Array.from({ length: Math.ceil(this.state.data.length / this.state.pageSize) }, (v, i) => i + 1);
            const updatedFilterData = this.state.data.slice((this.state.pageSize * (this.state.currentPage - 1)), (this.state.pageSize * (this.state.currentPage)));
            const totalPages = Math.ceil(RuleData.data.length / this.state.pageSize);
            this.setState({ pages: updatePages, filteredData: updatedFilterData, currentPage: 1, totalPages: totalPages, startIndex: 1, endIndex: 4 });
        });
    }

    moveUpDown(id: string, direction: string) {
        const indexToBeMoveSource = this.state.data.findIndex((d: any) => d.id === id);
        const indexToBeMoveDestination = direction === "up" ? indexToBeMoveSource - 1 : indexToBeMoveSource + 1;
        if (indexToBeMoveSource < 1 && direction === "up") {
            alert('Cannot move first upwards');
            return;
        }
        if (indexToBeMoveDestination > this.state.data.length - 1 && direction === "down") {
            alert('Cannot move last downwards');
            return;
        }
        const updatedData = [...this.state.data];
        [updatedData[indexToBeMoveSource], updatedData[indexToBeMoveDestination]] = [updatedData[indexToBeMoveDestination], updatedData[indexToBeMoveSource]];
        this.setState({ data: updatedData }, () => {
            const updatedFilterData = this.state.data.slice((this.state.pageSize * (this.state.currentPage - 1)), (this.state.pageSize * (this.state.currentPage)));
            this.setState({ filteredData: updatedFilterData });
        });
    }

    movePagesNext() {
        const { startIndex, endIndex } = this.state;
        this.setState({ startIndex: startIndex + 3, endIndex: endIndex + 3 });
    }

    movePagePrev() {
        const { startIndex, endIndex } = this.state;
        this.setState({ startIndex: startIndex - 3, endIndex: endIndex - 3 });
    }

    render() {
        return (
            <div>
                <Table
                    filteredData={this.state.filteredData}
                    pages={this.state.pages}
                    totalRecords={this.state.data.length}
                    startIndex={this.state.startIndex}
                    endIndex={this.state.endIndex}
                    currentPage={this.state.currentPage}
                    filterData={this.filterData}
                    remove={this.remove}
                    clone={this.clone}
                    changePageSize={this.changePageSize}
                    moveUpDown={this.moveUpDown}
                    movePagesNext={this.movePagesNext}
                    movePagesPrev={this.movePagePrev}
                />
            </div>
        )
    }
}
