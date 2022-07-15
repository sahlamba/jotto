export const notify = (
  toast,
  {
    title,
    description = '',
    status = 'info',
    position = 'top',
    duration = 5000,
    isClosable = true,
  },
) => {
  toast({
    title,
    description,
    status,
    position,
    duration,
    isClosable,
  })
}
