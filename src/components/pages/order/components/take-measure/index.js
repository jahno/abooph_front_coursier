import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import TakeMeasureForm from './take-measure-form';

export default function TakeMeasure() {
    return (
        <Fragment>
            <Breadcrumb title="Prise de mesure" parent="Mesure" parentUrl="orders"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Prise de mesure</h5>
                            </div>
                            <div className="card-body">
                                <TakeMeasureForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
