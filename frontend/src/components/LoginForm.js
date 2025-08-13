import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  // 아이디와 비밀번호 상태 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 페이지 이동을 위한 훅 (예: 로그인 성공 시 메인 화면으로 이동)
  const navigate = useNavigate();

  // 로그인 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();  // 기본 동작(페이지 새로고침) 막기


    // 아이디 공백 제거 + 소문자 통일
    const cleanUsername = username.trim().toLowerCase();

    try {
      // 로그인 요청 (POST /api/auth/login)
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        username: cleanUsername, // 정리된 값 전송
        password,  // 서버(Spring Boot)는 인증 성공 시 JWT 토큰을 Authorization 헤더에 담아 응답
      });

      // 응답에서 JWT 토큰 꺼내서 localStorage에 저장
      const token = res.data.token;  // 응답 헤더에서 JWT 토큰 추출
      localStorage.setItem('token', token);  // JWT 토큰을 localStorage에 저장하여 인증 유지

      alert('로그인 성공');

      // 로그인 성공 후 메인 페이지("/")로 이동
      navigate('/');
    } catch (err) {
      // 로그인 실패 시 알림창 표시
      alert('로그인 실패');
    }
  };

  // 화면 렌더링
  return (
    <Container style={{ marginTop: '100px' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">로그인</h3>

              {/* 로그인 입력 폼 */}
              <Form onSubmit={handleSubmit}>
                {/* 아이디 입력 */}
                <Form.Group className="mb-3">
                  <Form.Label>아이디</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* 비밀번호 입력 */}
                <Form.Group className="mb-3">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* 로그인 버튼 */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    로그인
                  </Button>
                </div>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
