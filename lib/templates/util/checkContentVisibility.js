export default function hideContentOnDevice (deviceVisibility, currentDevice) {
  if ((deviceVisibility === 'mobile' || deviceVisibility === 'mobileTablet') && currentDevice.isMobile) {
    return true
  } else if ((deviceVisibility === 'tabletDesktop' || deviceVisibility === 'mobileTablet') && currentDevice.isTablet) {
    return true
  } else if ((deviceVisibility === 'tabletDesktop' || deviceVisibility === 'desktop') && currentDevice.isDesktop) {
    return true
  }
  return false
}
