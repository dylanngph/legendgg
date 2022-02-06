// import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from 'assets/icons/home'
import NewsIcon from 'assets/icons/news'
import WalletIcon from 'assets/icons/wallet'

export const navBar = [
  {
    href: "/",
    title: "Tin tức mới nhất",
    icon: NewsIcon
  },
  {
    href: "/your-wallet",
    title: "Ví của bạn",
    icon: WalletIcon
  },
  {
    href: "/dashboard",
    title: "Trung tâm quản trị",
    icon: HomeIcon,
  },
  {
    href: "/setting",
    title: "Setting",
    icon: SettingsIcon,
  }
];