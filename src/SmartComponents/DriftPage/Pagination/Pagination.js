import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pagination, DropdownDirection } from '@patternfly/react-core';

const perPageOptions = [
    { title: '10', value: 10 },
    { title: '25', value: 25 },
    { title: '50', value: 50 },
    { title: '100', value: 100 }
];

export class TablePagination extends Component {
    constructor(props) {
        super(props);

        this.onSetPage = this.onSetPage.bind(this);
        this.onPerPageSelect = this.onPerPageSelect.bind(this);
    }

    onSetPage(event, page) {
        const { updatePagination } = this.props;

        const { perPage } = this.props;
        const pagination = { page, perPage };
        updatePagination(pagination);
    }

    onPerPageSelect(event, perPage) {
        const { updatePagination } = this.props;

        const page = 1;
        const pagination = { page, perPage };
        updatePagination(pagination);
    }

    render() {
        const { totalFacts, page, perPage, isCompact } = this.props;

        return (
            <Pagination
                itemCount={ totalFacts ? totalFacts : 0 }
                perPageOptions={ perPageOptions }
                page={ totalFacts === 0 ? 0 : page }
                perPage={ perPage }
                dropDirection={ DropdownDirection.down }
                onSetPage={ this.onSetPage }
                onPerPageSelect={ this.onPerPageSelect }
                isCompact={ isCompact }
            />
        );
    }
}

TablePagination.propTypes = {
    perPage: PropTypes.number,
    page: PropTypes.number,
    updatePagination: PropTypes.func,
    totalFacts: PropTypes.number,
    isCompact: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        page: state.compareState.page,
        perPage: state.compareState.perPage,
        totalFacts: state.compareState.totalFacts
    };
}

export default connect(mapStateToProps, null)(TablePagination);
