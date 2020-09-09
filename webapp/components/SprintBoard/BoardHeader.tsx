import React, { useState, useCallback } from 'react';
import MemberAvatarGroup, { Member } from '../MemberAvatarGroup/MemberAvatarGroup';
import { IconButton, Menu, MenuItem, Modal } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIssue from './SearchIssue';
import { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';

interface BoardHeaderProps {
  columnsList: CardsColumnType[];
  projectMembers: Member[];
}

export default ({ projectMembers, columnsList }: BoardHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuButtonClick = useCallback(
    e => {
      setAnchorEl(e.currentTarget);
      setIsMenuOpen(true);
    },
    [isMenuOpen, anchorEl]
  );
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, [isMenuOpen]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, paddingLeft: 20 }}>
        <h1>LOGO</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MemberAvatarGroup list={projectMembers} maxItems={3} />
        <SearchIssue columnsList={columnsList} />
        <IconButton aria-label="more" component="span" onClick={handleMenuButtonClick}>
          <MoreHorizIcon />
        </IconButton>
        {isMenuOpen && (
          <Menu anchorEl={anchorEl} id="simple-menu" keepMounted open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuItem onClick={handleMenuClose}>Add member</MenuItem>
            <MenuItem onClick={handleMenuClose}>Remove member</MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};
