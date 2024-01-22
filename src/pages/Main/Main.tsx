import { useEffect, useState, MouseEvent } from 'react';
import './Main.scss';
import storage from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks';
import { login, signup } from '../../services';
import { Button, Input } from '../../components/common';

export default function Main() {
  const [mode, setMode] = useState('login');
  const [token] = useState(storage.get('token'));

  const [username, password, checkPw] = [
    useInput({
      initVal: '',
      //validation: v => v.indexOf('@') > -1,
      validation: () => true,
    }),
    useInput({
      initVal: '',
      //validation: v => v.length >= 8
      validation: () => true,
    }),
    useInput({
      initVal: '',
      //validation: v => password && v === password.value,
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
      const res = await login({
        username: username.value,
        password: password.value,
      });

      if (res.status === 200) {
        storage.set('token', res.data.token);
        console.log(res);
        navigate('/todo');
      } else {
        alert('로그인에 실패했어요');
      }
    } else {
      const res = await signup({
        username: username.value,
        password: password.value,
      });

      if (res.status === 201) {
        alert('회원가입 성공');
      } else {
        alert('다시 시도하세요');
      }
    }
  };

  useEffect(() => {
    username.onReset();
    password.onReset();
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
            label="아이디"
            placeholder="아이디를 입력해주세요"
            param={{
              value: username.value,
              onChange: username.onChange,
              type: 'text',
              name: '아이디',
            }}
            valid={username.valid}
            errMsg="아이디를 입력해주세요"
          />

          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            param={{
              value: password.value,
              onChange: password.onChange,
              type: 'password',
              name: 'prepassword',
            }}
            valid={password.valid}
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
                ? !username.valid || !password.valid
                : !username.valid || !password.valid || !checkPw.valid
            }
          >
            {mode === 'login' ? '로그인' : '가입'}
          </Button>
        </div>
      </form>
    </div>
  );
}
