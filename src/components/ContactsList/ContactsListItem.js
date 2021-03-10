import PropTypes from 'prop-types';
import s from './ContactsListItem.module.scss';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ContactsListItem({ items, onDeleteContact }) {
  return (
    <>
      <TransitionGroup component={null}>
        {items.map(({ id, name, number }) => (
          <CSSTransition key={id} timeout={250} classNames={s}>
            <li className={s.item}>
              <div className={s.content}>
                <p>
                  {name}: {number}
                </p>
              </div>
              <div className={s.options}>
                {/* <Button
                  style={{ width: 80 }}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => onEditContact()}
                >
                  Edit
                </Button> */}
                <Button
                  style={{ marginLeft: '5px', width: 95 }}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteContact(id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {items.length === 0 && <p>Contacts not found</p>}
    </>
  );
}

ContactsListItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsListItem;
