import { useEffect, useState } from 'react';
import './Main.scss';
import storage from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks';
import { login, signup } from '../../services';
import { Button, Input } from '../../components/common';

export default function Main() {
  const [mode, setMode] = useState('login');
  const [token] = useState(storage.get('token'));

  const [email, pw, checkPw] = [
    useInput({
      initVal: '',
      validation: () => true,
    }),
    useInput({ initVal: '', validation: () => true }),
    useInput({
      initVal: '',
      validation: () => true,
    }),
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/todo');
    } else {
      navigate('/');
    }
  }, [navigate]);

  const changeMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'login') {
      const res = await login({ username: email.value, password: pw.value });

      if (res.status === 200) {
        storage.set('token', res.data.token);
        navigate('/todo');
      } else {
        alert('로그인에 실패했어요');
      }
    } else {
      const res = await signup({ username: email.value, password: pw.value });

      if (res.status === 201) {
        alert('회원가입 성공');
      } else {
        alert('다시 시도하세요');
      }
    }
  };

  useEffect(() => {
    email.onReset();
    pw.onReset();
    checkPw.onReset();
  }, [mode]);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h3 className="form-title">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h3>
          <div className="text-center">
            {mode === 'login'
              ? '아직 가입하지 않으셨다면 '
              : '이미 가입했던 적이 있다면 '}
            <span className="link-primary" onClick={changeMode}>
              {mode === 'login' ? '회원가입' : '로그인'}
            </span>
          </div>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            param={{
              value: email.value,
              onChange: email.onChange,
              type: 'text',
              name: 'email',
            }}
            valid={email.valid}
            errMsg="이메일을 입력해주세요"
          />

          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            param={{
              value: pw.value,
              onChange: pw.onChange,
              type: 'password',
              name: 'prepassword',
            }}
            valid={pw.valid}
            errMsg="비밀번호를 입력해주세요"
          />

          {mode === 'login' ? (
            <></>
          ) : (
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요"
              param={{
                value: checkPw.value,
                onChange: checkPw.onChange,
                type: 'password',
                name: 'password',
              }}
              valid={checkPw.valid}
              errMsg="입력하신 비밀번호와 다릅니다"
            />
          )}

          <Button
            type="user"
            onClick={undefined}
            disabled={
              mode === 'login'
                ? !email.valid || !pw.valid
                : !email.valid || !pw.valid || !checkPw.valid
            }
          >
            {mode === 'login' ? '로그인' : '가입'}
          </Button>
        </div>
      </form>
    </div>
  );
}
