import React from 'react';
import App from "../../../Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Breadcrumb from "../../../Components/Breadcrumb";
import SearchFilter from "../../../Components/SearchFilter";
import SmallPagination from "../../../Components/SmallPagination";
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function TopicTrashed() {
    const { data: topics, meta: {links, from} } = usePage().props.topics

    const deleteHandler = (topic) => {
        Swal.fire({
            title: `Are you sure want to delete the "${topic.name}" topic?`,
            text: 'You will not be able to revert this!.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Discard',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('trash.topic_force', topic) , {
                    preserveScroll: true,
                })
            }
        })
    }

    return (
        <>
            <Head title="Dream Space | Trashed"/>
            <Breadcrumb
                titleHeading="Trash Topics"
                item1="Dashboard"
                item2="Trash"
                item3="Topics" linkItem3={route('trash.topic_index')}
            />
            <div className="d-flex flex-column-fluid mb-11">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title font-weight-bolder text-dark">
                                Topics
                            </h3>
                            <div className="card-toolbar">
                                <SearchFilter placeholder={"Search topics . . ."}/>
                            </div>
                        </div>
                        <div className="card-body py-0">
                            <div className="table-responsive">
                                <table className="table table-head-custom table-vertical-center p-5">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="pl-0" style={{width: '30px'}}>#</th>
                                        <th style={{minWidth: '120px'}}>Name</th>
                                        <th style={{minWidth: '100px'}}>Slug</th>
                                        <th style={{minWidth: '150px'}}>Description</th>
                                        <th style={{width: '70px'}} className="text-center">Series</th>
                                        <th style={{width: '100px', minWidth: '50px'}}>Archived</th>
                                        <th style={{width: '50px', minWidth: '50px'}}>Position</th>
                                        <th className="pr-0 text-right" style={{width: '20px'}}>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark-50">
                                    {
                                        topics.length > 0 ?
                                            topics.map((topic, index) => (
                                                <tr key={topic.id} className="odd">
                                                    <td className="pl-0">
                                                        { from + index}
                                                    </td>
                                                    <td className="pl-0">
                                                        <div className="d-flex align-items-center">
                                                            <div className="symbol symbol-50 overflow-hidden mr-3">
                                                                <div className="symbol-label">
                                                                    <img src={topic.picture} width={50} height={50} alt={topic.slug} className="w-100" />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                <a href="" className="text-dark-75 font-weight-bold text-hover-primary">{topic.name}</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold">{topic.slug}</span>
                                                    </td>
                                                    <td>
                                                        <div className="font-weight-bold">{topic.description.substring(0, 50)}...</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">30</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`label label-${topic.is_archived ? 'danger' : 'success'} label-pill label-inline mr-2`}>{topic.is_archived ? 'Archived' : 'Public'}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="font-weight-bold">{topic.position}</span>
                                                    </td>
                                                    <td className="pr-0 text-center">
                                                        <div className="btn-group">
                                                            <Link preserveScroll={true}
                                                                  as="button"
                                                                  method="post"
                                                                  href={route('trash.topic_restore', topic)}
                                                                  className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Restore">
                                                                <i className="la la-redo-alt text-success" />
                                                            </Link>
                                                            <button onClick={() => deleteHandler(topic)} className="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Delete permanent">
                                                                <i className="la la-trash text-danger" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={7} className="text-center p-7 font-weight-bolder">No records found in table</td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <SmallPagination links={links}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

TopicTrashed.layout = (page) => <App children={page}/>