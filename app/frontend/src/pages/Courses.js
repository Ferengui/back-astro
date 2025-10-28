import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" data-testid="courses-page">
      <div className="courses-content">
        <div className="page-header">
          <h1 data-testid="courses-title">📚 Cursos de Astrologia</h1>
          <p data-testid="courses-subtitle">
            Aprenda astrologia do básico ao avançado com nossos cursos estruturados
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state card" data-testid="empty-courses">
            <div className="empty-icon">📦</div>
            <h3>Nenhum curso disponível</h3>
            <p>Em breve teremos cursos incríveis sobre astrologia para você!</p>
          </div>
        ) : (
          <div className="courses-grid grid grid-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card card"
                data-testid={`course-card-${course.id}`}
              >
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="course-image"
                  />
                )}
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className={`level-badge level-${course.level}`}>
                      {course.level === 'beginner' && 'Iniciante'}
                      {course.level === 'intermediate' && 'Intermediário'}
                      {course.level === 'advanced' && 'Avançado'}
                    </span>
                    <span className="category-badge">{course.category}</span>
                  </div>
                  <button className="btn btn-primary btn-block">Acessar Curso</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
