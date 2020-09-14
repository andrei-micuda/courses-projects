import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './Courses.css';
import Course from '../Course/Course';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    clickedCourseHandler = (id, title) => {
        this.props.history.push(`/courses/${id}/${title}`);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Amazing Udemy Courses</h1>
                    <section className="Courses">
                        {
                            this.state.courses.map(course => {
                                return <article
                                    className="Course"
                                    key={course.id}
                                    onClick={() => this.clickedCourseHandler(course.id, course.title)}>
                                    {course.title}</article>;
                            })
                        }
                    </section>
                </div>
                <Route path={this.props.match.url + "/:id/:title"} component={Course} />
            </React.Fragment>
        );
    }
}

export default Courses;