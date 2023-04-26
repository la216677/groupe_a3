<?php

class User implements JsonSerializable
{

  private $id_users;
  private $name_users;
  private $lastname_user;
  private $email_users;

  /**
   * @return mixed
   */
  public function getname_users()
  {
    return $this->name_users;
  }

  /**
   * @param mixed $firstname
   * @return self
   */
  public function setName_users($name_users): self
  {
    $this->name_users = $name_users;
    return $this;
  }

  /**
   * @return mixed
   */
  public function getLastname_user()
  {
    return $this->lastname_user;
  }

  /**
   * @param mixed $lastname
   * @return self
   */
  public function setlastname_user($lastname_user): self
  {
    $this->lastname_user = $lastname_user;
    return $this;
  }

  /**
   * @return mixed
   */
  public function getemail_users()
  {
    return $this->email_users;
  }

  /**
   * @param mixed $email
   * @return self
   */
  public function seteMail_users($email_users): self
  {
    $this->email_users = $email_users;
    return $this;
  }

  /**
   * @return mixed
   */
  public function getId_users()
  {
    return $this->id_users;
  }

  /**
   * @param mixed $id
   * @return self
   */
  public function setId_users($id_users): self
  {
    $this->id_users = $id_users;
    return $this;
  }
  /**
   * Specify data which should be serialized to JSON
   * Serializes the object to a value that can be serialized natively by json_encode().
   * @return mixed Returns data which can be serialized by json_encode(), which is a value of any type other than a resource .
   */
  public function jsonSerialize()
  {
    return array(
      'id' => $this->getId_users(),
      'firstname' => $this->getname_users(),
      'lastname' => $this->getLastname_user(),
      'email' => $this->getemail_users(),
    );
  }
}
