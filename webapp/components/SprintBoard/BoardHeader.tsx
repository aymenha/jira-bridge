import React, { useState, useCallback } from "react";
import MemberAvatarGroup, {
  Member
} from "../MemberAvatarGroup/MemberAvatarGroup";
import { TextField, IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

interface BoardHeaderProps {
  projectMembers: Member[];
  onSearch: (searchText: string) => void;
  onAddMember: (newMember: Member) => void;
  onRemoveMember: (id: number) => void;
}
export default ({
  onSearch,
  onAddMember,
  onRemoveMember,
  projectMembers
}: BoardHeaderProps) => {
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
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingLeft: 20 }}>
        <h1>LOGO</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          placeholder="search"
          variant="outlined"
          style={{ marginRight: 25 }}
        />
        <MemberAvatarGroup list={projectMembers} maxItems={3} />
        <IconButton
          aria-label="more"
          component="span"
          onClick={handleMenuButtonClick}
        >
          <MoreHorizIcon />
        </IconButton>
        {isMenuOpen && (
          <Menu
            anchorEl={anchorEl}
            id="simple-menu"
            keepMounted
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <MenuItem onClick={handleMenuClose}>Add member</MenuItem>
            <MenuItem onClick={handleMenuClose}>Remove member</MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};
