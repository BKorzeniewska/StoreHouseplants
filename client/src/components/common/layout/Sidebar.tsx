import { ReactNode, useContext, useEffect, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './side-bar.css'
import { ThemeContext } from '../../themes/ThemeProvider';
import { ArticleMenu, loadArticleMenu } from '../../blog/article/apis/article';
import { useLocation, useNavigate } from 'react-router-dom';
import { useError } from '../ErrorContext';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../auth/AuthContext';


type DropdownLinkProps = {
  name: string;
  children: React.ReactNode;
  dropdown?: boolean;
}

function DropdownLink({ children, name, dropdown }: DropdownLinkProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdown ? true : false);
  const { isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const arrowStyle = {
    transform: isDropdownOpen ? 'rotate(90deg) scaleY(2) scaleX(0.5)' : 'rotate(270deg) scaleY(2) scaleX(0.5)',
  };

  return (
    <Nav.Item>
      <Nav.Link onClick={handleDropdownToggle} className="sidebar-item">{name}
        {isAuthorized("MODERATOR") &&
          <span className="modify-button">
            <FaPlus onClick={(event) => { event.preventDefault(); event.stopPropagation(); navigate(`/admin/edit/`) }} />

          </span>}
        <span style={arrowStyle} className='arrow'>&#9658;</span>
      </Nav.Link>
      {isDropdownOpen && children}
    </Nav.Item>
  );
}

export const Sidebar = (props: { width: number, children: React.ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthorized } = useContext(AuthContext);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const [result, setResult] = useState<ArticleMenu[]>();
  const { errorMessages, setError } = useError();

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname.split("/"));

  }, [location]);

  const { theme } = useContext(ThemeContext);


};

